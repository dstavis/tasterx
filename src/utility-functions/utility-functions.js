const formatShowSearch = (string) => {
  return string.toLowerCase().split(' ').join('+');
}

export { formatShowSearch };