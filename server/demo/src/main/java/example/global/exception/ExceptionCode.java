package example.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    FANS_NOT_FOUND(404, "Fans not found"),
    FANS_EXISTS(409, "Fans exists"),
    ARTIST_NOT_FOUND(404, "Artist not found"),
    ARTIST_EXISTS(409, "Artist exists"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    QUESTION_EXISTS(409, "Question exists"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    ANSWER_EXISTS(409, "Answer exists"),
    ACCESS_DENIED_USER(403,"Access Denied Fans"),
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status");  // TO 추가된 부분

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
