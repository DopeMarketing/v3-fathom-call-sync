interface PipedreamWorkflow {
  id: string;
  name: string;
  summary?: string;
  created_at: string;
  updated_at: string;
}

interface PipedreamEvent {
  id: string;
  workflow_id: string;
  original_timestamp: string;
  original_event: any;
}

interface TriggerWorkflowPayload {
  [key: string]: any;
}

class PipedreamClient {
  private apiKey: string;
  private baseUrl = 'https://api.pipedream.com/v1';

  constructor() {
    this.apiKey = process.env.PIPEDREAM_API_KEY!;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return response.json();
  }

  async getWorkflows(): Promise<PipedreamWorkflow[]> {
    try {
      const data = await this.request('/workflows');
      return data.data || [];
    } catch (error) {
      throw new Error(`Failed to get workflows: ${error}`);
    }
  }

  async triggerWorkflow(workflowId: string, payload: TriggerWorkflowPayload): Promise<any> {
    try {
      return await this.request(`/sources/${workflowId}/event`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (error) {
      throw new Error(`Failed to trigger workflow: ${error}`);
    }
  }
}

const pipedreamClient = new PipedreamClient();

export const { getWorkflows, triggerWorkflow } = pipedreamClient;