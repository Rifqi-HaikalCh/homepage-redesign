import { Influencer } from './supabase';

/**
 * Extended Influencer interface for detail pages
 * Includes additional fields for Instagram, TikTok, services, and portfolio
 */
export interface InfluencerDetail extends Influencer {
  instagram_handle?: string;
  instagram_followers?: string;
  instagram_engagement_rate?: string;
  instagram_avg_likes?: string;
  instagram_avg_comments?: string;
  tiktok_handle?: string;
  tiktok_followers?: string;
  tiktok_engagement_rate?: string;
  tiktok_avg_likes?: string;
  tiktok_avg_views?: string;
  services?: string[] | null;
  portfolio?: Array<{
    id: string;
    title: string;
    image_url: string;
    description?: string;
  }> | null;
  user_id?: string;
}

/**
 * Mock influencer data for UI display
 * This data follows the Influencer interface structure
 */
export const mockInfluencers: InfluencerDetail[] = [
  {
    id: 1,
    name: 'Anya Wijaya',
    content_type: 'Lifestyle & Fashion',
    instagram: '@anyawijaya',
    followers: '250K',
    city: 'Jakarta',
    avatar: 'https://i.pravatar.cc/400?img=1',
    instagram_handle: '@anyawijaya',
    instagram_followers: '250K',
    instagram_engagement_rate: '4.2%',
    instagram_avg_likes: '10.5K',
    instagram_avg_comments: '450',
    tiktok_handle: '@anyawijaya.id',
    tiktok_followers: '180K',
    tiktok_engagement_rate: '6.8%',
    tiktok_avg_likes: '12.2K',
    tiktok_avg_views: '85K',
    services: ['Instagram Post', 'Instagram Story', 'TikTok Video', 'Photoshoot'],
    portfolio: [
      { id: '1-1', title: 'Fashion Campaign - Spring Collection', image_url: 'https://picsum.photos/seed/fashion1/800/600', description: 'Spring fashion collaboration with local brand' },
      { id: '1-2', title: 'Lifestyle Brand Partnership', image_url: 'https://picsum.photos/seed/lifestyle1/800/600', description: 'Lifestyle product endorsement' },
      { id: '1-3', title: 'Beauty Product Review', image_url: 'https://picsum.photos/seed/beauty1/800/600', description: 'Skincare routine collaboration' }
    ],
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    content_type: 'Tech & Gaming',
    instagram: '@budisantoso',
    followers: '180K',
    city: 'Bandung',
    avatar: 'https://i.pravatar.cc/400?img=12',
    instagram_handle: '@budisantoso',
    instagram_followers: '180K',
    instagram_engagement_rate: '5.5%',
    instagram_avg_likes: '9.9K',
    instagram_avg_comments: '380',
    tiktok_handle: '@budigaming',
    tiktok_followers: '320K',
    tiktok_engagement_rate: '8.2%',
    tiktok_avg_likes: '26K',
    tiktok_avg_views: '150K',
    services: ['Product Review', 'Gaming Stream', 'Tech Tutorial', 'Sponsored Content'],
    portfolio: [
      { id: '2-1', title: 'Gaming Laptop Review', image_url: 'https://picsum.photos/seed/gaming1/800/600', description: 'Latest gaming laptop showcase' },
      { id: '2-2', title: 'Mobile Gaming Tournament', image_url: 'https://picsum.photos/seed/gaming2/800/600', description: 'Gaming competition coverage' },
      { id: '2-3', title: 'Tech Gadget Unboxing', image_url: 'https://picsum.photos/seed/tech1/800/600', description: 'Latest smartphone unboxing' }
    ],
    created_at: '2024-01-16T09:30:00Z',
    updated_at: '2024-01-16T09:30:00Z'
  },
  {
    id: 3,
    name: 'Citra Dewi',
    content_type: 'Beauty & Skincare',
    instagram: '@citradewi',
    followers: '320K',
    city: 'Surabaya',
    avatar: 'https://i.pravatar.cc/400?img=5',
    instagram_handle: '@citradewi',
    instagram_followers: '320K',
    instagram_engagement_rate: '7.1%',
    instagram_avg_likes: '22.7K',
    instagram_avg_comments: '850',
    tiktok_handle: '@citradewi.beauty',
    tiktok_followers: '450K',
    tiktok_engagement_rate: '9.5%',
    tiktok_avg_likes: '42.8K',
    tiktok_avg_views: '280K',
    services: ['Beauty Tutorial', 'Product Review', 'Makeup Service', 'Brand Ambassador'],
    portfolio: [
      { id: '3-1', title: 'Skincare Routine Series', image_url: 'https://picsum.photos/seed/skincare1/800/600', description: 'Daily skincare routine guide' },
      { id: '3-2', title: 'Makeup Transformation', image_url: 'https://picsum.photos/seed/makeup1/800/600', description: 'Dramatic makeup transformation' },
      { id: '3-3', title: 'Beauty Brand Campaign', image_url: 'https://picsum.photos/seed/beauty2/800/600', description: 'Beauty product launch campaign' }
    ],
    created_at: '2024-01-17T10:15:00Z',
    updated_at: '2024-01-17T10:15:00Z'
  },
  {
    id: 4,
    name: 'Dimas Pratama',
    content_type: 'Travel & Food',
    instagram: '@dimaspratama',
    followers: '420K',
    city: 'Bali',
    avatar: 'https://i.pravatar.cc/400?img=13',
    instagram_handle: '@dimaspratama',
    instagram_followers: '420K',
    instagram_engagement_rate: '6.3%',
    instagram_avg_likes: '26.5K',
    instagram_avg_comments: '920',
    tiktok_handle: '@dimasexplore',
    tiktok_followers: '580K',
    tiktok_engagement_rate: '10.2%',
    tiktok_avg_likes: '59K',
    tiktok_avg_views: '350K',
    services: ['Travel Photography', 'Food Review', 'Tourism Promotion', 'Hotel Partnership'],
    portfolio: [
      { id: '4-1', title: 'Bali Hidden Gems', image_url: 'https://picsum.photos/seed/bali1/800/600', description: 'Exploring hidden beaches in Bali' },
      { id: '4-2', title: 'Culinary Journey Jakarta', image_url: 'https://picsum.photos/seed/food1/800/600', description: 'Best food spots in Jakarta' },
      { id: '4-3', title: 'Mountain Adventure', image_url: 'https://picsum.photos/seed/travel1/800/600', description: 'Hiking and camping experience' }
    ],
    created_at: '2024-01-18T11:00:00Z',
    updated_at: '2024-01-18T11:00:00Z'
  },
  {
    id: 5,
    name: 'Eka Putri',
    content_type: 'Fitness & Health',
    instagram: '@ekaputri',
    followers: '95K',
    city: 'Yogyakarta',
    avatar: 'https://i.pravatar.cc/400?img=9',
    instagram_handle: '@ekaputri',
    instagram_followers: '95K',
    instagram_engagement_rate: '8.7%',
    instagram_avg_likes: '8.3K',
    instagram_avg_comments: '320',
    tiktok_handle: '@ekafitness',
    tiktok_followers: '210K',
    tiktok_engagement_rate: '11.5%',
    tiktok_avg_likes: '24K',
    tiktok_avg_views: '120K',
    services: ['Workout Tutorial', 'Fitness Coaching', 'Nutrition Guide', 'Wellness Content'],
    portfolio: [
      { id: '5-1', title: 'Home Workout Series', image_url: 'https://picsum.photos/seed/fitness1/800/600', description: 'Effective home workout routines' },
      { id: '5-2', title: 'Healthy Meal Prep', image_url: 'https://picsum.photos/seed/health1/800/600', description: 'Weekly meal preparation guide' },
      { id: '5-3', title: 'Yoga & Meditation', image_url: 'https://picsum.photos/seed/yoga1/800/600', description: 'Morning yoga routine' }
    ],
    created_at: '2024-01-19T12:30:00Z',
    updated_at: '2024-01-19T12:30:00Z'
  },
  {
    id: 6,
    name: 'Faisal Rahman',
    content_type: 'Art & Creative',
    instagram: '@faisalrahman',
    followers: '150K',
    city: 'Medan',
    avatar: 'https://i.pravatar.cc/400?img=14',
    instagram_handle: '@faisalrahman',
    instagram_followers: '150K',
    instagram_engagement_rate: '6.8%',
    instagram_avg_likes: '10.2K',
    instagram_avg_comments: '410',
    tiktok_handle: '@faisalart',
    tiktok_followers: '280K',
    tiktok_engagement_rate: '9.8%',
    tiktok_avg_likes: '27.4K',
    tiktok_avg_views: '190K',
    services: ['Digital Art', 'Design Tutorial', 'Brand Design', 'Creative Consultation'],
    portfolio: [
      { id: '6-1', title: 'Digital Illustration Series', image_url: 'https://picsum.photos/seed/art1/800/600', description: 'Character design showcase' },
      { id: '6-2', title: 'Brand Identity Design', image_url: 'https://picsum.photos/seed/design1/800/600', description: 'Logo and branding project' },
      { id: '6-3', title: 'Creative Process Timelapse', image_url: 'https://picsum.photos/seed/creative1/800/600', description: 'Behind the scenes artwork' }
    ],
    created_at: '2024-01-20T13:45:00Z',
    updated_at: '2024-01-20T13:45:00Z'
  },
  {
    id: 7,
    name: 'Gita Sari',
    content_type: 'Lifestyle & Fashion',
    instagram: '@gitasari',
    followers: '280K',
    city: 'Jakarta',
    avatar: 'https://i.pravatar.cc/400?img=10',
    instagram_handle: '@gitasari',
    instagram_followers: '280K',
    instagram_engagement_rate: '5.9%',
    instagram_avg_likes: '16.5K',
    instagram_avg_comments: '620',
    tiktok_handle: '@gitasari.style',
    tiktok_followers: '350K',
    tiktok_engagement_rate: '8.9%',
    tiktok_avg_likes: '31K',
    tiktok_avg_views: '200K',
    services: ['Fashion Styling', 'OOTD Content', 'Brand Collaboration', 'Fashion Events'],
    portfolio: [
      { id: '7-1', title: 'Office Style Lookbook', image_url: 'https://picsum.photos/seed/fashion2/800/600', description: 'Professional outfit ideas' },
      { id: '7-2', title: 'Street Fashion Jakarta', image_url: 'https://picsum.photos/seed/street1/800/600', description: 'Urban fashion inspiration' },
      { id: '7-3', title: 'Evening Wear Collection', image_url: 'https://picsum.photos/seed/evening1/800/600', description: 'Elegant evening looks' }
    ],
    created_at: '2024-01-21T14:00:00Z',
    updated_at: '2024-01-21T14:00:00Z'
  },
  {
    id: 8,
    name: 'Hendra Kusuma',
    content_type: 'Tech & Gaming',
    instagram: '@hendrakusuma',
    followers: '210K',
    city: 'Solo',
    avatar: 'https://i.pravatar.cc/400?img=15',
    instagram_handle: '@hendrakusuma',
    instagram_followers: '210K',
    instagram_engagement_rate: '7.2%',
    instagram_avg_likes: '15.1K',
    instagram_avg_comments: '520',
    tiktok_handle: '@hendratech',
    tiktok_followers: '390K',
    tiktok_engagement_rate: '10.5%',
    tiktok_avg_likes: '41K',
    tiktok_avg_views: '220K',
    services: ['Tech Review', 'Coding Tutorial', 'App Development', 'Tech Consultation'],
    portfolio: [
      { id: '8-1', title: 'Smartphone Comparison', image_url: 'https://picsum.photos/seed/phone1/800/600', description: 'Flagship phone review' },
      { id: '8-2', title: 'Programming Tutorial Series', image_url: 'https://picsum.photos/seed/coding1/800/600', description: 'Web development basics' },
      { id: '8-3', title: 'Tech Setup Tour', image_url: 'https://picsum.photos/seed/setup1/800/600', description: 'Workspace and gear showcase' }
    ],
    created_at: '2024-01-22T15:20:00Z',
    updated_at: '2024-01-22T15:20:00Z'
  },
  {
    id: 9,
    name: 'Intan Permata',
    content_type: 'Beauty & Skincare',
    instagram: '@intanpermata',
    followers: '380K',
    city: 'Malang',
    avatar: 'https://i.pravatar.cc/400?img=16',
    instagram_handle: '@intanpermata',
    instagram_followers: '380K',
    instagram_engagement_rate: '8.3%',
    instagram_avg_likes: '31.5K',
    instagram_avg_comments: '1.1K',
    tiktok_handle: '@intanbeauty',
    tiktok_followers: '620K',
    tiktok_engagement_rate: '12.1%',
    tiktok_avg_likes: '75K',
    tiktok_avg_views: '420K',
    services: ['Makeup Tutorial', 'Skincare Review', 'Beauty Consultation', 'Product Launch'],
    portfolio: [
      { id: '9-1', title: 'Glowing Skin Secrets', image_url: 'https://picsum.photos/seed/skincare2/800/600', description: 'Skincare routine for glowing skin' },
      { id: '9-2', title: 'Party Makeup Look', image_url: 'https://picsum.photos/seed/makeup2/800/600', description: 'Glamorous party makeup' },
      { id: '9-3', title: 'Local Beauty Brand Collab', image_url: 'https://picsum.photos/seed/beauty3/800/600', description: 'Indonesian beauty brand partnership' }
    ],
    created_at: '2024-01-23T16:10:00Z',
    updated_at: '2024-01-23T16:10:00Z'
  },
  {
    id: 10,
    name: 'Joko Widodo',
    content_type: 'Travel & Food',
    instagram: '@jokowidodo_travel',
    followers: '520K',
    city: 'Semarang',
    avatar: 'https://i.pravatar.cc/400?img=17',
    instagram_handle: '@jokowidodo_travel',
    instagram_followers: '520K',
    instagram_engagement_rate: '7.8%',
    instagram_avg_likes: '40.6K',
    instagram_avg_comments: '1.5K',
    tiktok_handle: '@jokotravel',
    tiktok_followers: '780K',
    tiktok_engagement_rate: '11.8%',
    tiktok_avg_likes: '92K',
    tiktok_avg_views: '550K',
    services: ['Travel Vlog', 'Food Review', 'Tourism Campaign', 'Travel Guide'],
    portfolio: [
      { id: '10-1', title: 'Indonesia Heritage Sites', image_url: 'https://picsum.photos/seed/heritage1/800/600', description: 'Cultural tourism showcase' },
      { id: '10-2', title: 'Street Food Adventure', image_url: 'https://picsum.photos/seed/food2/800/600', description: 'Traditional Indonesian cuisine' },
      { id: '10-3', title: 'Island Hopping Series', image_url: 'https://picsum.photos/seed/island1/800/600', description: 'Exploring Indonesian archipelago' }
    ],
    created_at: '2024-01-24T17:30:00Z',
    updated_at: '2024-01-24T17:30:00Z'
  }
];

/**
 * Get mock influencers with optional filtering
 */
export const getMockInfluencers = (filters?: {
  contentType?: string;
  city?: string;
  followerRange?: string;
  searchTerm?: string;
}): InfluencerDetail[] => {
  let filtered = [...mockInfluencers];

  // Filter by content type
  if (filters?.contentType && filters.contentType !== 'Semua') {
    filtered = filtered.filter(inf => inf.content_type === filters.contentType);
  }

  // Filter by city
  if (filters?.city && filters.city !== 'Semua') {
    filtered = filtered.filter(inf => inf.city === filters.city);
  }

  // Filter by follower range
  if (filters?.followerRange && filters.followerRange !== 'Semua') {
    const parseFollowers = (followers: string): number => {
      return parseFloat(followers.replace('K', ''));
    };

    filtered = filtered.filter(inf => {
      const count = parseFollowers(inf.followers);
      switch (filters.followerRange) {
        case '0-50K':
          return count >= 0 && count < 50;
        case '50K-100K':
          return count >= 50 && count < 100;
        case '100K-200K':
          return count >= 100 && count < 200;
        case '200K+':
          return count >= 200;
        default:
          return true;
      }
    });
  }

  // Filter by search term
  if (filters?.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(inf =>
      inf.name.toLowerCase().includes(term) ||
      inf.content_type.toLowerCase().includes(term) ||
      inf.city.toLowerCase().includes(term) ||
      inf.instagram.toLowerCase().includes(term)
    );
  }

  return filtered;
};

/**
 * Get a single mock influencer by ID
 */
export const getMockInfluencerById = (id: number): InfluencerDetail | undefined => {
  return mockInfluencers.find(inf => inf.id === id);
};

/**
 * Get random mock influencers
 */
export const getRandomMockInfluencers = (count: number = 3): InfluencerDetail[] => {
  const shuffled = [...mockInfluencers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
