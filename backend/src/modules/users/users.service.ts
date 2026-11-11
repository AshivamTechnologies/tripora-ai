import { mockStore } from '../../database/mock-store';
import { AppError } from '../../middleware/error';

export class UsersService {
  public async getProfile(userId: string) {
    const user = mockStore.users.get(userId);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.profile,
      preference: user.preference,
      createdAt: user.createdAt,
    };
  }

  public async updateProfile(userId: string, data: { fullName?: string; country?: string; city?: string; bio?: string }) {
    const user = mockStore.users.get(userId);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    user.profile = { ...user.profile, ...data };
    mockStore.users.set(userId, user);
    mockStore.users.set(user.email, user);
    return user.profile;
  }

  public async updatePreferences(
    userId: string,
    data: { preferredCurrency?: string; preferredLanguage?: string; travelPace?: string; budgetTier?: string }
  ) {
    const user = mockStore.users.get(userId);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    user.preference = { ...user.preference, ...data };
    mockStore.users.set(userId, user);
    mockStore.users.set(user.email, user);
    return user.preference;
  }

  public async deleteAccount(userId: string) {
    const user = mockStore.users.get(userId);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    user.status = 'INACTIVE';
    mockStore.users.delete(userId);
    mockStore.users.delete(user.email);
  }

  public async exportUserData(userId: string) {
    const user = await this.getProfile(userId);
    const trips = Array.from(mockStore.trips.values()).filter((t) => t.ownerId === userId);
    return {
      user,
      trips,
      exportedAt: new Date().toISOString(),
    };
  }
}

export const usersService = new UsersService();
