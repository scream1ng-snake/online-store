import { HttpException, HttpStatus } from "@nestjs/common"

export function Paginate(page: number = 1, limit: number = 10) {
  if (page <= 0 || limit <= 0) {
    throw new HttpException("Неверные параметры пагинации", HttpStatus.BAD_REQUEST)
  }
  return {
    limit,
    offset: page * limit - limit
  }
}