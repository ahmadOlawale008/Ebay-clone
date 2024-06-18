import Button from "../../components/Button/button"

const DoesNotExist = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-y-4 items-center">
        <h3 className="font-bold text-4xl text-center filter drop-shadow-lg">404</h3>
        <h4 className="font-semibold text-2xl text-center">Page not found.</h4>
      </div>
      <div className="page-not-found-actions">
        <Button fullWidth size="large" variant="filled"  color="secondary" baseClassName="rounded-lg">Home</Button>
        <Button fullWidth size="large" variant="outlined" color="primary" baseClassName="rounded-lg">Back to previous page</Button>
      </div>
    </div>
  )
}

export default DoesNotExist
