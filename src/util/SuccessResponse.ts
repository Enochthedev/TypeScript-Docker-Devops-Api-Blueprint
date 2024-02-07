const Success = (data: any, meta = {}): any => {
  return ({
    status: true,
    meta,
    data
  })
}

export default Success
