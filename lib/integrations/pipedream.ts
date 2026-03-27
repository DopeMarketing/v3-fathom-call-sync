import axios from 'axios';

const pipedreamClient = axios.create({
  baseURL: 'https://api.pipedream.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.PIPEDREAM_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

interface EventData {
  workflowId: string;
  data: Record<string, any>;
}

interface WorkflowEvent {
  id: string;
  status: 'processing' | 'success' | 'error';
  timestamp: string;
}

export async function sendEvent(
  eventData: EventData
): Promise<WorkflowEvent> {
  try {
    const response = await pipedreamClient.post(
      `/sources/${eventData.workflowId}/events`,
      { data: eventData.data }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send event: ${error}`);
  }
}

export async function getWorkflows(): Promise<any[]> {
  try {
    const response = await pipedreamClient.get('/workflows');
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to get workflows: ${error}`);
  }
}