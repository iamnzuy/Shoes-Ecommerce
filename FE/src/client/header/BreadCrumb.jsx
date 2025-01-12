import { useLocation, Link } from "react-router"


function BreadCrumb(){
    const location = useLocation();

    let currentLink = '';
    
    let links = location.pathname
    .split('/')
    .filter(crumb => crumb !== '');

    const crumbs = links
    .map((crumb, i) => {
        currentLink += `/${crumb}`

        return (
            <div className="inline-block " key={crumb}><Link to={currentLink} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</Link>{i < links.length - 1 ? <span className="mx-1">&#47;</span> : <span></span>}</div>
        )

    })


    return (
        <div className="col-start-2 mx-8">{crumbs}</div>
    )
}

export default BreadCrumb;