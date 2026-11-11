import { mockStore, MockDestination } from '../../database/mock-store';
import { AppError } from '../../middleware/error';

export class DestinationsService {
  public async listDestinations(params?: {
    search?: string;
    country?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<MockDestination[]> {
    let list = Array.from(mockStore.destinations.values());

    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }

    if (params?.country) {
      list = list.filter((d) => d.country.toLowerCase() === params.country!.toLowerCase());
    }

    if (params?.featured !== undefined) {
      list = list.filter((d) => d.isFeatured === params.featured);
    }

    if (params?.limit) {
      list = list.slice(0, params.limit);
    }

    return list;
  }

  public async getDestinationById(id: string): Promise<MockDestination> {
    const dest = mockStore.destinations.get(id);
    if (!dest) {
      throw new AppError('Destination not found', 404, 'DESTINATION_NOT_FOUND');
    }
    return dest;
  }

  public async getDestinationWeather(id: string) {
    const dest = await this.getDestinationById(id);
    // Provide realistic weather data with demo indicators
    return {
      destinationId: dest.id,
      city: dest.city,
      current: {
        tempC: 28,
        tempF: 82,
        condition: 'Partly Cloudy',
        humidity: 68,
        windKmh: 14,
        uvIndex: 7,
      },
      forecast: [
        { day: 'Today', tempHighC: 29, tempLowC: 24, condition: 'Partly Cloudy', icon: 'cloud-sun' },
        { day: 'Tomorrow', tempHighC: 30, tempLowC: 23, condition: 'Sunny', icon: 'sun' },
        { day: 'Day 3', tempHighC: 28, tempLowC: 24, condition: 'Scattered Showers', icon: 'cloud-rain' },
        { day: 'Day 4', tempHighC: 29, tempLowC: 23, condition: 'Clear', icon: 'sun' },
        { day: 'Day 5', tempHighC: 29, tempLowC: 24, condition: 'Sunny', icon: 'sun' },
      ],
      isLive: false,
      provider: 'Tripora Weather Engine (Demo & Live-ready)',
    };
  }
}

export const destinationsService = new DestinationsService();
