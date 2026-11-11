import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../config';
import { mockStore } from '../../database/mock-store';
import { AppError } from '../../middleware/error';

export interface UserResponse {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPPORT';
  profile: {
    fullName: string;
    avatarUrl?: string;
    country?: string;
    city?: string;
  };
  preference: {
    preferredCurrency: string;
    preferredLanguage: string;
    travelPace: string;
    budgetTier: string;
  };
}

export class AuthService {
  private generateTokens(user: { id: string; email: string; role: 'USER' | 'ADMIN' | 'SUPPORT' }) {
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ id: user.id }, config.jwt.refreshSecret, {
      expiresIn: '7d',
    });

    // Store refresh token
    const tokenHash = bcrypt.hashSync(refreshToken, 8);
    mockStore.refreshTokens.set(tokenHash, {
      id: uuidv4(),
      userId: user.id,
      tokenHash,
      isRevoked: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    });

    return { accessToken, refreshToken, expiresIn: 900 };
  }

  public async register(data: {
    email: string;
    password: string;
    fullName: string;
    country?: string;
    preferredCurrency?: string;
  }) {
    const existing = mockStore.users.get(data.email.toLowerCase());
    if (existing) {
      throw new AppError('An account with this email already exists', 409, 'EMAIL_EXISTS');
    }

    const userId = `usr-${uuidv4()}`;
    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = {
      id: userId,
      email: data.email.toLowerCase(),
      passwordHash,
      role: 'USER' as const,
      status: 'ACTIVE' as const,
      emailVerified: true,
      profile: {
        fullName: data.fullName,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.fullName)}`,
        country: data.country || 'United States',
        city: '',
      },
      preference: {
        preferredCurrency: data.preferredCurrency || 'USD',
        preferredLanguage: 'en',
        travelPace: 'Balanced',
        budgetTier: 'Moderate',
      },
      createdAt: new Date().toISOString(),
    };

    mockStore.users.set(userId, newUser);
    mockStore.users.set(newUser.email, newUser);

    const tokens = this.generateTokens(newUser);
    return {
      user: this.formatUser(newUser),
      tokens,
    };
  }

  public async login(email: string, password: string) {
    const user = mockStore.users.get(email.toLowerCase());
    if (!user) {
      throw new AppError('Invalid email or password credentials', 401, 'INVALID_CREDENTIALS');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid email or password credentials', 401, 'INVALID_CREDENTIALS');
    }

    const tokens = this.generateTokens(user);
    return {
      user: this.formatUser(user),
      tokens,
    };
  }

  public async refresh(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as { id: string };
      const user = mockStore.users.get(decoded.id);
      if (!user) {
        throw new AppError('User not found', 401, 'INVALID_TOKEN');
      }

      const tokens = this.generateTokens(user);
      return tokens;
    } catch {
      throw new AppError('Invalid or expired refresh token', 401, 'REFRESH_TOKEN_EXPIRED');
    }
  }

  public async getMe(userId: string): Promise<UserResponse> {
    const user = mockStore.users.get(userId);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    return this.formatUser(user);
  }

  private formatUser(user: any): UserResponse {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.profile,
      preference: user.preference,
    };
  }
}

export const authService = new AuthService();
