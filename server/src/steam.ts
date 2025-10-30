import type { SteamProfile } from './types';

const STEAM_OPENID_URL = 'https://steamcommunity.com/openid/login';
const STEAM_API_BASE = 'https://api.steampowered.com';

export class SteamAuth {
  private apiKey: string;
  private realm: string;
  private returnUrl: string;

  constructor(apiKey: string, realm: string, returnUrl: string) {
    this.apiKey = apiKey;
    this.realm = realm;
    this.returnUrl = returnUrl;
  }

  // Generate Steam OpenID authentication URL
  getAuthUrl(): string {
    const params = new URLSearchParams({
      'openid.ns': 'http://specs.openid.net/auth/2.0',
      'openid.mode': 'checkid_setup',
      'openid.return_to': this.returnUrl,
      'openid.realm': this.realm,
      'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
      'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
    });

    return `${STEAM_OPENID_URL}?${params.toString()}`;
  }

  // Verify Steam OpenID response
  async verifyAuth(params: Record<string, string>): Promise<string | null> {
    try {
      // Change mode to check_authentication
      const verifyParams = new URLSearchParams({
        ...params,
        'openid.mode': 'check_authentication',
      });

      const response = await fetch(STEAM_OPENID_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: verifyParams.toString(),
      });

      const text = await response.text();

      if (text.includes('is_valid:true')) {
        // Extract Steam ID from claimed_id
        const claimedId = params['openid.claimed_id'];
        const steamId = claimedId?.split('/').pop();
        return steamId || null;
      }

      return null;
    } catch (error) {
      console.error('Steam auth verification error:', error);
      return null;
    }
  }

  // Get Steam profile data
  async getPlayerSummary(steamId: string): Promise<SteamProfile | null> {
    try {
      const url = `${STEAM_API_BASE}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${steamId}`;
      const response = await fetch(url);
      const data = await response.json();

      const players = data?.response?.players;
      if (players && players.length > 0) {
        return players[0];
      }

      return null;
    } catch (error) {
      console.error('Failed to fetch Steam profile:', error);
      return null;
    }
  }
}
