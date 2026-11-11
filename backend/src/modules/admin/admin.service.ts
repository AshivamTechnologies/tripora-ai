import { mockStore } from '../../database/mock-store';

export class AdminService {
  public async getOverview() {
    const users = Array.from(mockStore.users.values()).filter((u, i, arr) => arr.findIndex((x) => x.id === u.id) === i);
    const trips = Array.from(mockStore.trips.values()).filter((t) => !t.isArchived);
    const expenses = Array.from(mockStore.expenses.values());
    const totalVolumeMinor = expenses.reduce((sum, e) => sum + e.amountMinor, 0);

    const activeTrips = trips.filter((t) => t.status === 'UPCOMING' || t.status === 'ONGOING').length;
    const completedTrips = trips.filter((t) => t.status === 'COMPLETED').length;

    return {
      metrics: {
        totalUsers: users.length,
        activeUsers: users.filter((u) => u.status === 'ACTIVE').length,
        totalTrips: trips.length,
        activeTrips,
        completedTrips,
        totalAiCalls: mockStore.aiUsageLogs.length,
        totalTrackedExpensesMinor: totalVolumeMinor,
        currency: 'USD',
      },
      providers: Array.from(mockStore.providerConfigs.values()),
      recentAiLogs: mockStore.aiUsageLogs.slice(-10).reverse(),
      systemHealth: {
        serverStatus: 'OPERATIONAL',
        databaseEngine: 'PostgreSQL / Prisma Native & Memory Cache',
        cacheStore: 'Redis & LRU Memory Active',
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
      },
    };
  }

  public async listUsers() {
    return Array.from(mockStore.users.values())
      .filter((u, i, arr) => arr.findIndex((x) => x.id === u.id) === i)
      .map((u) => ({
        id: u.id,
        email: u.email,
        fullName: u.profile?.fullName || '',
        role: u.role,
        status: u.status,
        country: u.profile?.country || '',
        createdAt: u.createdAt,
      }));
  }

  public async listTrips() {
    return Array.from(mockStore.trips.values()).map((t) => ({
      id: t.id,
      title: t.title,
      destination: t.destination,
      origin: t.origin,
      startDate: t.startDate,
      endDate: t.endDate,
      status: t.status,
      adults: t.adults,
      budgetMinor: t.budgetMinor,
      currency: t.currency,
      ownerId: t.ownerId,
      createdAt: t.createdAt,
    }));
  }

  public async getAiUsage() {
    return {
      totalCalls: mockStore.aiUsageLogs.length,
      logs: mockStore.aiUsageLogs.slice(-50).reverse(),
    };
  }

  public async getProviders() {
    return Array.from(mockStore.providerConfigs.values());
  }

  public async getAuditLogs() {
    return mockStore.auditLogs.slice(-50).reverse();
  }
}

export const adminService = new AdminService();
