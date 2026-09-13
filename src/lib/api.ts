const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined in the environment variables, endpoint is required for API calls.'); 
}

export async function submitConsent(consentGiven: boolean): Promise<{ success: boolean } | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/consent`, {
            method: 'POST',
            credentials: 'include', // Include cookies for session tracking 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ consentGiven }),
        });

        if (!response.ok) {
            console.error('Failed to submit consent:', response.statusText);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting consent:', error);
        return null;
    }
}

export async function pingVisitor(): Promise<{ tracked: boolean } | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/ping`, {
            method: 'GET',
            credentials: 'include', // Include cookies for session tracking 
        });

        if (!response.ok) {
            console.error('Failed to ping visitor:', response.statusText);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error pinging visitor:', error);
        return null;
    }
}