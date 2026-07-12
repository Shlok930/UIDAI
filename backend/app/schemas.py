from pydantic import BaseModel

class QueryFilters(BaseModel):
    state: str | None = None
    district: str | None = None
    year: int | None = None
    gender: str | None = None
    age_group: str | None = None
    area_type: str | None = None
