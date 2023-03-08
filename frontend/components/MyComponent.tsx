import axios from 'axios'

function MyComponent() {
  async function fetchData() {
    return axios
      .get('http://localhost:3000/api/v1/sutras/')
      .then(function (response) {
        // handle success
        console.log(response.data)
        console.log('成功')
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        console.log('エラー')
      })
      .finally(function () {
        // always executed
      })
  }

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  )
}

export default MyComponent
