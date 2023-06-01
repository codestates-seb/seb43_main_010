package example.global.colormap;

public enum Color {
    RED("#FF0000"),
    MAROON("#800000"),
    YELLOW("#FFFF00"),
    OLIVE("#808000"),
    LIME("#00FF00"),
    GREEN("#008000"),
    TEAL("#008080"),
    PULPLE("#800080");


    private String code;

    Color(String code) {
        this.code = code;
    }
    public String getCode() {
        return code;
    }
    public static Color getColorByIndex(int index) {
        return values()[index];
    }
}