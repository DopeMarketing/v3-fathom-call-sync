interface PipedreamClient {
  baseURL: string;
  apiKey: string;
}

const client: PipedreamClient = {
  baseURL: 'https://api.pipedream.com/v1',
  apiKey: process.env.PIPEDREAM_API_KEY!
};

export interface Workflow {
  id: string;
  name: string;
  summary: string;
  created_at: string;
  updated_at: string;
}

export interface TriggerWorkflowParams {
  workflowId: string;
  data?: Record<string, any>;
}

export async function getWorkflows(): Promise<Workflow[]> {
  try {
    const response = await fetch(`${client.baseURL}/workflows`, {
      headers: {
        'Authorization': `Bearer ${client.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.workflows;
  } catch (error) {
    throw new Error(`Failed to get workflows: ${error}`);
  }
}

export async function triggerWorkflow(params: TriggerWorkflowParams): Promise<any> {
  try {
    const response = await fetch(`${client.baseURL}/workflows/${params.workflowId}/trigger`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${client.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data || {})
    });
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to trigger workflow: ${error}`);
  }
}