package example.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    FANS_NOT_FOUND(404, "Fans not found"),
    FANS_EXISTS(409, "Fans exists"),
    ARTIST_NOT_FOUND(404, "Artist not found"),
    ARTIST_EXISTS(409, "Artist exists"),
    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "User exists"),
    GROUP_NOT_FOUND(404, "Group not found"),
    FEEDPOST_NOT_FOUND(404, "feedpost not found"),
    FEEDPOST_AUTHOR_NOT_MATCH(404, "The author of the feedpost does not match"),
    FEEDPOST_EXISTS(409, "feedpost exists"),
    ARTISTPOST_NOT_FOUND(404, "artistpost not found"),
    ARTISTPOST_AUTHOR_NOT_MATCH(404, "The author of the artistpost does not match"),
    COMMENT_NOT_FOUND(404,"comment not found"),
    COMMENT_EXISTS(409, "comment exists"),
    COMMENT_AUTHOR_NOT_MATCH(404, "The author of the comment does not match"),
    DELETE_FAILE(404,"삭제 실패");
//    ACCESS_DENIED_USER(403,"Access Denied Fans"),
//    CANNOT_CHANGE_ORDER(403, "Order can not change"),
//    NOT_IMPLEMENTATION(501, "Not Implementation"),
//    INVALID_MEMBER_STATUS(400, "Invalid member status");  // TO 추가된 부분

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
