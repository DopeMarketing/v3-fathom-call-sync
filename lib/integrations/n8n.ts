import axios from 'axios';

const n8nClient = axios.create({
  baseURL: 'https://api.n8n.io/api/v1',
  headers: {
    'X-N8N-API-KEY': process.env.N8N_API_KEY,
    'Content-Type': 'application/json'
  }
});

interface WorkflowTrigger {
  workflowId: string;
  data?: Record<string, any>;
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'success' | 'error';
  startedAt: string;
}

export async function triggerWorkflow(
  options: WorkflowTrigger
): Promise<WorkflowExecution> {
  try {
    const response = await n8nClient.post(
      `/workflows/${options.workflowId}/execute`,
      { data: options.data }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to trigger workflow: ${error}`);
  }
}

export async function getWorkflowStatus(
  executionId: string
): Promise<WorkflowExecution> {
  try {
    const response = await n8nClient.get(`/executions/${executionId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get workflow status: ${error}`);
  }
}