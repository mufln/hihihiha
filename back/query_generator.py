import enum
import logging
import sqlite3
from typing import Optional, Iterable, Optional, TypeVar, Any, Type, Generic, Literal

T = TypeVar("T")


class Token:
    def __init__(self, value: str):
        self.value = value
    value: Optional[str] = None
    AND: 'Token'
    OR: 'Token'
    EQUALS: 'Token'
    NOT_EQUALS: 'Token'
    GREATER_THAN: 'Token'
    LESS_THAN: 'Token'
    GREATER_THAN_OR_EQUALS: 'Token'
    LESS_THAN_OR_EQUALS: 'Token'
    SELECT: 'Token'
    FROM: 'Token'
    WHERE: 'Token'
    INSERT: 'Token'
    INTO: 'Token'
    VALUES: 'Token'
    COMMA: 'Token'
    RIGHT_PAREN: 'Token'
    LEFT_PAREN: 'Token'
    MISSING: 'Token'

# I hate this, but I don't know how to make it better
Token.AND = Token("AND")
Token.OR = Token("OR")
Token.EQUALS = Token("=")
Token.NOT_EQUALS = Token("!=")
Token.GREATER_THAN = Token(">")
Token.LESS_THAN = Token("<")
Token.GREATER_THAN_OR_EQUALS = Token(">=")
Token.LESS_THAN_OR_EQUALS = Token("<=")
Token.SELECT = Token("SELECT")
Token.FROM = Token("FROM")
Token.WHERE = Token("WHERE")
Token.INSERT = Token("INSERT")
Token.INTO = Token("INTO")
Token.VALUES = Token("VALUES")
Token.COMMA = Token(",")
Token.RIGHT_PAREN = Token(")")
Token.LEFT_PAREN = Token("(")
Token.MISSING = Token("%s")


class QueryGenerator(Generic[T]):
    def __init__(self, table_name: str, columns: list[str], model: Type[T], mode: Literal["select", "insert"],
                 values: Optional[Iterable[Any]] = None):
        self._table_name = table_name
        self._columns = columns
        self._model = model
        self._mode = mode
        self._where_clause: str | None = None
        self._where_values: list[Any] = []
        self._values = values
        self._single: bool | None = None

    def where(self, where_clause: str, values: Iterable[Any]) -> 'QueryGenerator[T]':
        if self._where_clause:
            raise Exception("Only one where clause is allowed")
        if self._mode == "insert":
            raise Exception("Cannot use where clause in insert mode")
        self._where_clause = where_clause
        self._where_values = list(values)
        return self

    def single(self) -> 'QueryGenerator[Optional[T]]':
        self._single = True
        return self  # type: ignore

    def many(self) -> 'QueryGenerator[list[T]]':
        self._single = False
        return self  # type: ignore

    def on(self, db: sqlite3.Connection) -> T:
        logging.info(f"Executing command: {self._produce_string()}")
        cursor = db.execute(self._produce_string(), tuple(list(self._values or []) + list(self._where_values or [])))
        if self._single:
            res = cursor.fetchone()
            return self._model(**res) if res else None  # type: ignore
        else:
            return [self._model(**row) for row in cursor.fetchall()]  # type: ignore

    def _produce_tokens(self) -> list[Token]:
        tokens: list[Token] = []
        if self._mode == "select":
            tokens.append(Token.SELECT)
            tokens.extend(self._produce_columns_tokens())
            tokens.append(Token.FROM)
            tokens.append(Token(self._table_name))
            if self._where_clause:
                tokens.append(Token.WHERE)
                tokens.append(Token(self._where_clause))
        elif self._mode == "insert":
            tokens.append(Token.INSERT)
            tokens.append(Token.INTO)
            tokens.append(Token(self._table_name))
            tokens.append(Token.LEFT_PAREN)
            tokens.extend(self._produce_columns_tokens())
            tokens.append(Token.RIGHT_PAREN)
            tokens.append(Token.LEFT_PAREN)
            tokens.extend(self._produce_missing_tokens(len(self._columns)))
            tokens.append(Token.RIGHT_PAREN)
        return tokens

    def _produce_columns_tokens(self) -> list[Token]:
        tokens = [Token(self._columns[0])]
        for column in self._columns[1:]:
            tokens.append(Token.COMMA)
            tokens.append(Token(column))
        return tokens

    @staticmethod
    def _produce_missing_tokens(count: int) -> list[Token]:
        tokens = []
        for _ in range(count):
            tokens.append(Token.MISSING)
        return tokens

    def _produce_string(self):
        tokens = self._produce_tokens()
        return " ".join(token.value for token in tokens)