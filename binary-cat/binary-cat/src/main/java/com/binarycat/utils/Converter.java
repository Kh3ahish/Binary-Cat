package com.binarycat.utils;

import com.google.gson.JsonObject;

public class Converter {
    public static JsonObject convertNumber(String input, String fromBase) {
        JsonObject result = new JsonObject();

        try {
            if (!validateInput(input, fromBase)) {
                throw new IllegalArgumentException("Invalid " + fromBase + " input");
            }

            int decimal;

            if ("text".equals(fromBase)) {
                String binary = textToBinary(input);
                result.addProperty("binary", binary);
                return result;
            }

            switch (fromBase) {
                case "binary":
                    decimal = Integer.parseInt(input, 2);
                    break;
                case "decimal":
                    decimal = Integer.parseInt(input, 10);
                    break;
                case "octal":
                    decimal = Integer.parseInt(input, 8);
                    break;
                case "hexadecimal":
                    decimal = Integer.parseInt(input, 16);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid base");
            }

            result.addProperty("binary", Integer.toBinaryString(decimal));
            result.addProperty("decimal", Integer.toString(decimal));
            result.addProperty("octal", Integer.toOctalString(decimal));
            result.addProperty("hexadecimal", Integer.toHexString(decimal).toUpperCase());
        } catch (Exception e) {
            result.addProperty("error", e.getMessage());
        }

        return result;
    }

    public static String convertBinaryToText(String input) {
        if (!validateInput(input, "binaryToText")) {
            throw new IllegalArgumentException("Invalid binary input");
        }

        String[] binaryArray = input.split(" ");
        StringBuilder text = new StringBuilder();

        for (String binary : binaryArray) {
            if (!binary.matches("^[01]{8}$")) {
                throw new IllegalArgumentException("Invalid binary input: each byte must be 8 bits long");
            }
            int charCode = Integer.parseInt(binary, 2);
            text.append((char) charCode);
        }

        return text.toString();
    }

    private static boolean validateInput(String input, String type) {
        final int maxLength = 1000;
        if (input.length() > maxLength) {
            throw new IllegalArgumentException("Input is too long. Maximum length is " + maxLength + " characters.");
        }

        switch (type) {
            case "binary":
                return input.matches("^[01]+$");
            case "decimal":
                return input.matches("^\\d+$");
            case "octal":
                return input.matches("^[0-7]+$");
            case "hexadecimal":
                return input.matches("^[0-9A-Fa-f]+$");
            case "text":
            case "binaryToText":
                return true;
            default:
                return false;
        }
    }

    private static String textToBinary(String input) {
        StringBuilder binary = new StringBuilder();
        for (char c : input.toCharArray()) {
            binary.append(String.format("%8s", Integer.toBinaryString(c)).replace(' ', '0')).append(" ");
        }
        return binary.toString().trim();
    }
}

