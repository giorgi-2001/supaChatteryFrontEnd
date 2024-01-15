import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useAuthContext } from "../hooks/useAuthContext"
import Friends from "../components/Friends"

const Search = ({ setChatsLayout }) => {

    const [keyword, setKeyword] = useState('')
    const [list, setList] = useState(null)
    const [filteredList, setFilteredList] = useState([])

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchUsers = async () => {

            if(!user) return

            const url = import.meta.env.VITE_API_URL + '/api/users/users'
            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await res.json()
            if(res.ok) {
                setList(json)
            }
        }
        fetchUsers()
    }, [user])

    useEffect(() => {
        if(!keyword) {
            setFilteredList([])
            return
        }
        const filtered = list?.filter(m => 
            m.username.toLowerCase().includes(keyword.toLocaleLowerCase())
        )
        setFilteredList(filtered)
    }, [keyword, list])

    return ( 
        <div className="search">
            <form>
                <div className="search-container">
                    <img className="search__img" src="assets/search.png" alt="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search for users"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />
                </div>
            </form>
            {filteredList?.length > 0 && <div className="list-container">
                {filteredList.map(item => ( 
                    <ListItem 
                        item={item} 
                        key={item._id} 
                        setChatsLayout={setChatsLayout}
                    />  
                ))}
            </div>}

            <Friends setChatsLayout={setChatsLayout}/>
        </div>
     );
}
 
export default Search;