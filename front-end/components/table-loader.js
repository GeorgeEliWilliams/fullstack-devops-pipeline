import Loader from "@/components/loader";

export default function TableLoader({children}) {
    return (
        <div className="my-4">
            <Loader/>
        </div>
    );
}