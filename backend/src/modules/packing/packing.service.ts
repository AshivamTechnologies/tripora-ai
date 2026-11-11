import { v4 as uuidv4 } from 'uuid';
import { mockStore, MockPackingItem } from '../../database/mock-store';
import { AppError } from '../../middleware/error';

export class PackingService {
  public async getPackingList(tripId: string) {
    let list = mockStore.packingLists.get(tripId);
    if (!list) {
      const packingListId = `pack-${uuidv4()}`;
      list = {
        id: packingListId,
        tripId,
        items: [
          { id: uuidv4(), packingListId, category: 'DOCUMENTS', name: 'Passport / National ID', quantity: 1, isPacked: false, isWeatherDependent: false },
          { id: uuidv4(), packingListId, category: 'ELECTRONICS', name: 'Phone charger & adapter', quantity: 1, isPacked: false, isWeatherDependent: false },
          { id: uuidv4(), packingListId, category: 'HEALTH', name: 'Prescription medications', quantity: 1, isPacked: false, isWeatherDependent: false },
        ],
      };
      mockStore.packingLists.set(tripId, list);
    }

    const total = list.items.length;
    const packed = list.items.filter((i) => i.isPacked).length;
    const progressPercentage = total > 0 ? Math.round((packed / total) * 100) : 0;

    return {
      id: list.id,
      tripId,
      items: list.items,
      totalCount: total,
      packedCount: packed,
      progressPercentage,
    };
  }

  public async toggleItem(tripId: string, itemId: string, isPacked?: boolean): Promise<MockPackingItem> {
    const list = mockStore.packingLists.get(tripId);
    if (!list) {
      throw new AppError('Packing list not found', 404, 'NOT_FOUND');
    }

    const item = list.items.find((i) => i.id === itemId);
    if (!item) {
      throw new AppError('Item not found', 404, 'ITEM_NOT_FOUND');
    }

    item.isPacked = isPacked !== undefined ? isPacked : !item.isPacked;
    mockStore.packingLists.set(tripId, list);
    return item;
  }

  public async addItem(
    tripId: string,
    data: {
      name: string;
      category: MockPackingItem['category'];
      quantity?: number;
      isWeatherDependent?: boolean;
    }
  ): Promise<MockPackingItem> {
    let list = mockStore.packingLists.get(tripId);
    if (!list) {
      await this.getPackingList(tripId);
      list = mockStore.packingLists.get(tripId)!;
    }

    const newItem: MockPackingItem = {
      id: `p-${uuidv4()}`,
      packingListId: list.id,
      category: data.category || 'MISCELLANEOUS',
      name: data.name,
      quantity: data.quantity || 1,
      isPacked: false,
      isWeatherDependent: !!data.isWeatherDependent,
    };

    list.items.push(newItem);
    mockStore.packingLists.set(tripId, list);
    return newItem;
  }

  public async deleteItem(tripId: string, itemId: string): Promise<void> {
    const list = mockStore.packingLists.get(tripId);
    if (!list) {
      throw new AppError('Packing list not found', 404, 'NOT_FOUND');
    }

    list.items = list.items.filter((i) => i.id !== itemId);
    mockStore.packingLists.set(tripId, list);
  }

  public async generateAiSuggestions(tripId: string) {
    const trip = mockStore.trips.get(tripId);
    if (!trip) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    let list = mockStore.packingLists.get(tripId);
    if (!list) {
      await this.getPackingList(tripId);
      list = mockStore.packingLists.get(tripId)!;
    }

    const smartSuggestions: Array<Omit<MockPackingItem, 'id' | 'packingListId'>> = [
      { category: 'CLOTHING', name: 'Light moisture-wicking shirts', quantity: 4, isPacked: false, isWeatherDependent: true },
      { category: 'CLOTHING', name: 'Comfortable walking / hiking shoes', quantity: 1, isPacked: false, isWeatherDependent: false },
      { category: 'CLOTHING', name: 'Rain jacket or windbreaker', quantity: 1, isPacked: false, isWeatherDependent: true },
      { category: 'HEALTH', name: 'Broad-spectrum SPF 50 sunscreen', quantity: 1, isPacked: false, isWeatherDependent: true },
      { category: 'HEALTH', name: 'Bug spray / insect repellent', quantity: 1, isPacked: false, isWeatherDependent: true },
      { category: 'ELECTRONICS', name: 'High-capacity 20,000mAh power bank', quantity: 1, isPacked: false, isWeatherDependent: false },
      { category: 'DOCUMENTS', name: 'International driver permit (if driving)', quantity: 1, isPacked: false, isWeatherDependent: false },
    ];

    smartSuggestions.forEach((s) => {
      if (!list!.items.some((i) => i.name.toLowerCase() === s.name.toLowerCase())) {
        list!.items.push({
          id: `p-${uuidv4()}`,
          packingListId: list!.id,
          ...s,
        });
      }
    });

    mockStore.packingLists.set(tripId, list);
    return this.getPackingList(tripId);
  }
}

export const packingService = new PackingService();
