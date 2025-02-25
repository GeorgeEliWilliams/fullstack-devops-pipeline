export default function FormError({error}) {
    return (
        error && <div className="invalid-feedback">{error}</div>
    )
}