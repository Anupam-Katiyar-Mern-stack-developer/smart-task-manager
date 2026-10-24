import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

const Pagination = ({
    page = 1,
    totalPages = 1,
    onPageChange,
    loading = false,
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 py-4">
            <p className="text-sm text-slate-500">
                Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
                <span className="font-semibold text-slate-900">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={loading || page <= 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft size={16} /> Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={loading || page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    Next <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
};

export default Pagination;