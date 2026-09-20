type PageHeaderProps = {
    breadcrumb: string;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
};

export function PageHeader({
                               breadcrumb,
                               title,
                               description,
                               actionLabel,
                               onAction,
                           }: PageHeaderProps) {
    return (
        <div className="citizens-page-header">
            <div>
        <span className="page-breadcrumb">
          {breadcrumb}
        </span>

                <h1>{title}</h1>

                <p>{description}</p>
            </div>

            {actionLabel && (
                <button
                    className="primary-button"
                    type="button"
                    onClick={onAction}
                >
                    + {actionLabel}
                </button>
            )}
        </div>
    );
}