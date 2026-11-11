import { v4 as uuidv4 } from 'uuid';
import { mockStore, MockMember } from '../../database/mock-store';
import { AppError } from '../../middleware/error';

export class CollaborationService {
  public async listMembers(tripId: string): Promise<MockMember[]> {
    return Array.from(mockStore.members.values()).filter((m) => m.tripId === tripId);
  }

  public async inviteMember(
    tripId: string,
    email: string,
    role: 'EDITOR' | 'VIEWER' = 'VIEWER'
  ) {
    const trip = mockStore.trips.get(tripId);
    if (!trip) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    const token = uuidv4();
    const invitation = {
      id: `inv-${uuidv4()}`,
      tripId,
      email: email.toLowerCase(),
      role,
      token,
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      isAccepted: false,
      createdAt: new Date().toISOString(),
    };

    mockStore.invitations.set(token, invitation);

    // Also auto-add if the user exists for smooth local testing
    const existingUser = mockStore.users.get(email.toLowerCase());
    if (existingUser) {
      const memberId = `mem-${uuidv4()}`;
      mockStore.members.set(memberId, {
        id: memberId,
        tripId,
        userId: existingUser.id,
        email: existingUser.email,
        fullName: existingUser.profile?.fullName || email,
        role,
        joinedAt: new Date().toISOString(),
      });
    }

    return {
      invitationId: invitation.id,
      email,
      role,
      token,
      inviteLink: `https://tripora.ai/invite/${token}`,
    };
  }

  public async acceptInvitation(token: string, userId: string): Promise<MockMember> {
    const invite = mockStore.invitations.get(token);
    if (!invite || invite.isAccepted) {
      throw new AppError('Invalid or expired invitation link', 400, 'INVALID_INVITATION');
    }

    const user = mockStore.users.get(userId);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const memberId = `mem-${uuidv4()}`;
    const newMember: MockMember = {
      id: memberId,
      tripId: invite.tripId,
      userId: user.id,
      email: user.email,
      fullName: user.profile?.fullName || user.email,
      role: invite.role,
      joinedAt: new Date().toISOString(),
    };

    mockStore.members.set(memberId, newMember);
    invite.isAccepted = true;
    mockStore.invitations.set(token, invite);

    return newMember;
  }

  public async removeMember(tripId: string, memberId: string): Promise<void> {
    const member = mockStore.members.get(memberId);
    if (!member || member.tripId !== tripId) {
      throw new AppError('Member not found', 404, 'MEMBER_NOT_FOUND');
    }
    if (member.role === 'OWNER') {
      throw new AppError('Trip owner cannot be removed', 400, 'CANNOT_REMOVE_OWNER');
    }
    mockStore.members.delete(memberId);
  }
}

export const collaborationService = new CollaborationService();
