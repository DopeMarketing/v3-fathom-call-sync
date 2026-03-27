interface N8nClient {
  baseURL: string;
  apiKey: string;
}

const client: N8nClient = {
  baseURL: 'https://your-n8n-instance.com/api/v1',
  apiKey: process.env.N8N_API_KEY!
};

export interface Workflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExecuteWorkflowParams {
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

export async function executeWorkflow(params: ExecuteWorkflowParams): Promise<any> {
  try {
    const response = await fetch(`${client.baseURL}/workflows/${params.workflowId}/execute`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${client.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data || {})
    });
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to execute workflow: ${error}`);
  }
}