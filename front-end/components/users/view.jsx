import Link from "next/link";

function NoRecord() {
    return (
        <div className="bg-gray-100 border h-full">
            <div className="flex justify-center items-center h-full align-center">
                <div className="text-center">
                    <div>
                        No Data Selected.
                    </div>
                    <div className="text-sm">
                        Select record to view details.
                    </div>
                </div>
            </div>
        </div>

    );
}

export default function UserView({datum, deleteCb}) {

    if (!datum) {
        return <NoRecord/>
    }

    const getAffiliation = () => {
        return "--"
    }

    return (
        <div className="facility-view border bg-white shadow-sm h-full px-4 py-3">
            <div className="flex justify-between">
                <div>
                    <header className="text-3xl">{datum.name}</header>
                </div>
                <div className="flex gap-2">
                    <Link href={`/users/${datum.id}/edit`} className="btn btn-secondary btn-sm">
                        Edit
                    </Link>
                    <button className="btn btn-primary btn-sm" onClick={deleteCb}>
                        Delete
                    </button>
                </div>
            </div>
            <div
                className="mt-4 mb-2 bg-gray-50 px-2 py-2 border border-gray-100 grid grid-cols-1 lg:grid-cols-4 gap-10">
                <div className="group my-4">
                    <header className="text-sm text-gray-500">Username</header>
                    {datum.username}
                </div>
                <div className="group my-4">
                    <header className="text-sm text-gray-500">Role</header>
                    {datum.role?.name}
                </div>
                <div className="group my-4">
                    <header className="text-sm text-gray-500">Affiliation</header>
                    {getAffiliation()}
                </div>
            </div>
            <div className="my-2 bg-gray-50 px-2 py-2 border border-gray-100 grid grid-cols-1 lg:grid-cols-4 gap-10">
                <div className="group my-4">
                    <header className="text-sm text-gray-500">First Name</header>
                    {datum.first_name}
                </div>
                <div className="group my-4">
                    <header className="text-sm text-gray-500">Last Name</header>
                    {datum.last_name}
                </div>
                <div className="group my-4">
                    <header className="text-sm text-gray-500">Email</header>
                    {datum.email ?? "--"}
                </div>
                <div className="group my-4">
                    <header className="text-sm text-gray-500">Phone #</header>
                    {datum.phone ?? "--"}
                </div>
            </div>
        </div>
    )
}