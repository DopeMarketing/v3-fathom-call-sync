interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface N8nExecution {
  id: string;
  workflowId: string;
  finished: boolean;
  mode: string;
  startedAt: string;
  stoppedAt?: string;
}

class N8nClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.N8N_BASE_URL || 'http://localhost:5678';
    this.apiKey = process.env.N8N_API_KEY!;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}/api/v1${endpoint}`, {
      ...options,
      headers: {
        'X-N8N-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return response.json();
  }

  async getWorkflows(): Promise<N8nWorkflow[]> {
    try {
      const data = await this.request('/workflows');
      return data.data || [];
    } catch (error) {
      throw new Error(`Failed to get workflows: ${error}`);
    }
  }

  async executeWorkflow(workflowId: string, data: any = {}): Promise<N8nExecution> {
    try {
      const response = await this.request(`/workflows/${workflowId}/execute`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to execute workflow: ${error}`);
    }
  }
}

const n8nClient = new N8nClient();

export const { getWorkflows, executeWorkflow } = n8nClient;