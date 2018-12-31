---
title: Android 静默安装 apk
date: 2013-03-18 23:38:00
categories: [移动开发]
tags: [静默安装]
---

#### 获取 root 权限

    su

#### 安装 apk

    pm install -r package
    
#### 具体代码

    private void downloadApk(final String fileUrl) {
        new Thread() {
            public void run() {
                String filePath = Environment.getExternalStorageDirectory().getPath() + "/" + APK_NAME;
                InputStream is = null;
                FileOutputStream fos = null;
                try {
                    URL url = new URL(fileUrl);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();

                    File file = new File(filePath);
                    file.createNewFile();// 新建文件
                    
                    is = conn.getInputStream();
                    fos = new FileOutputStream(file);
                    byte[] buffer = new byte[1024];
                    while (true) {
                        int numread = is.read(buffer);
                        if (numread <= 0) {
                            break;
                        }
                        fos.write(buffer, 0, numread);
                    }
                    fos.flush();
                } catch (MalformedURLException e) {
                    System.out.println(e.getMessage());
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                } finally {
                    try {
                        is.close();
                        fos.close();
                        System.out.println("下载成功！");
                        installApk(filePath);
                    } catch (IOException e) {
                        System.out.println("下载失败！");
                        System.out.println(e.getMessage());
                    }
                }
            }
        }.start();
    }

    private void installApk(final String filePath) {
        new Thread() {
            public void run() {
                Process process = null;
                OutputStream out = null;
                try {
                    // 请求root
                    process = Runtime.getRuntime().exec("su");
                    out = process.getOutputStream();
                    // 调用安装
                    out.write(("pm install -r " + filePath + "\n").getBytes());
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                } finally {
                    try {
                        out.flush();
                        out.close();
                        System.out.println("安装成功！");
                        startApk();
                    } catch (IOException e) {
                        System.out.println("安装失败！");
                        System.out.println(e.getMessage());
                    }
                }
            }
        }.start();
    }