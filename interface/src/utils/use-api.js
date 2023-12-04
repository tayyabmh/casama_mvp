import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const useApi = (method, url, options = {}) => {
    const { getAccessTokenSilently } = useAuth0();
    const [ state, setState ] = useState({
        error: null,
        loading: true,
        data: null
    });
    const [ refreshIndex, setRefreshIndex ] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const {audience, scope, ...fetchOptions} = options;
                const accessToken = await getAccessTokenSilently({audience, scope});
                const response = await axios({
                    method: method,
                    url: url,
                    data: {
                        ...fetchOptions.data
                    },
                    headers: {
                        ...fetchOptions.headers,
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setState({
                    ...state,
                    data: await response.json(),
                    error: null,
                    loading: false
                });
            } catch (error) {
                setState({
                    ...state,
                    error,
                    loading: false
                });
            }
            })();
}, [refreshIndex]);

return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1)
}
}