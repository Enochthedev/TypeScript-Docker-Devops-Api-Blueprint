const Failed = (data: any, meta = {}): any => {
  return ({
    status: true,
    meta,
    data
  })
}

export default Failed
