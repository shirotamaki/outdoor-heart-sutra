import axios from 'axios'

function MyComponent() {
  async function fetchData() {
    return axios
      .get('http://localhost:3000/api/v1/sutras/')
      .then(function (response) {
        // 処理が成功した場合
        console.log(response.data)
        console.log('成功')
      })
      .catch(function (error) {
        // エラー処理
        console.log(error)
      })
      .then(function () {
        // 常に実行
      })
  }

  return (
    <div>
      <button onClick={fetchData}>Sutra Data!!</button>
    </div>
  )
}

export default MyComponent
