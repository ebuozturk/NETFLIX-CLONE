package com.example.netflix.dto;

public class FileDTO {
        private String base64;
        // just base64 string is enough. If you want, send additional details
        private String name;
        private String type;
        private String lastModified;

        public FileDTO() {
        }

        public FileDTO(String base64, String name, String type, String lastModified) {
            this.base64 = base64;
            this.name = name;
            this.type = type;
            this.lastModified = lastModified;
        }

        public String getBase64() {
            return base64;
        }

        public void setBase64(String base64) {
            this.base64 = base64;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getLastModified() {
            return lastModified;
        }

        public void setLastModified(String lastModified) {
            this.lastModified = lastModified;
        }
    }

