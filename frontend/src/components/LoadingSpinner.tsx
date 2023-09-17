const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center h-80 w-screen' aria-label='Loading Spinner'>
      <div className='animate-spin h-12 w-12 border-4 border-blue-800 rounded-full border-t-transparent'></div>
    </div>
  )
}
export default LoadingSpinner
