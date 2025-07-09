import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { AuthContext } from "../Component/AuthoncationAll/AuthProvider/AuthProvider"


let useRole = () => {

    let { user, loading } = useContext(AuthContext)

    const { refetch, data: roles = {} } = useQuery({

        queryKey: ["userRoleCheck", user?.email],

        enabled: !loading && !!user?.email,

        queryFn: async () => {
            const response = await fetch(`https://test.e-cash-id.com/userRoleCheck/${user?.email}`);
            // console.log(response)
            let data = await response.json();
            return data
        }
    })

    return [roles, refetch]
}

export default useRole