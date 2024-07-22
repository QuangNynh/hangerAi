import ky from 'ky'
// import { useLSBoundStore } from '~/stores'

// interface RefreshToken {
//   access: string
// }

const kyInstance = ky.create({
  prefixUrl: `${import.meta.env.VITE_BACKEND_BASE_URL}:${import.meta.env.VITE_BACKEND_BASE_PORT}`,
  hooks: {
    beforeRequest: [
      async (_request) => {
        if (_request.url.includes('authen/jwt/create/')) return
        try {
        //   (await ky
        //     .post(`${import.meta.env.VITE_PREFIX_URL}authen/jwt/verify`, {
        //       json: {
        //         token: useLSBoundStore.getState().accessToken,
        //       },
        //     })
        //     .json())
        } catch (ex) {
          try {
            // const token = (await ky
            //   .post(`${import.meta.env.VITE_PREFIX_URL}/authen/jwt/refresh`, {
            //     json: {
            //       refresh: useLSBoundStore.getState().refreshToken,
            //     },
            //   })
            //   .json()) as RefreshToken
            // _request.headers.set('Authorization', `JWT ${token.access}`)
            // useLSBoundStore.setState({
            //   accessToken: token.access,
            // })
          } catch (e) {
            console.log(e);
            
          }
        }
      },
    ],
    afterResponse: [
      (_request, _option, response) => {
        return response
      },
    ],
  },
  timeout: 60000 * 15
})

export default kyInstance
