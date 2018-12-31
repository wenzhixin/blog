---
title: 完全禁用 Wordpress 后台的更新提示和功能
date: 2013-01-14 10:48:00
categories: [后台技术]
tags: [Wordpress]
---

为了防止误操作，需要禁用后台的更新提示以及更新功能

### 需要禁用的更新包括：

#### 1. 头部更新提示 (wp-includes/admin-bar.php)

注释第 618 行：

    $wp_admin_bar->add_menu( array(
        'id'    => 'updates',
        'title' => $title,
        'href'  => network_admin_url( 'update-core.php' ),
        'meta'  => array(
            'title' => $update_data['title'],
        ),
    ) );

#### 2. 首页更新提示 (wp-admin/includes/update.php)

注释第 134 行和 145 行：

    echo "<div class='update-nag'>$msg</div>";

    if ( isset( $cur->response ) && $cur->response == 'upgrade' )
        $msg .= " <a href='" . network_admin_url( 'update-core.php' ) . "' class='button'>" . sprintf( __('Update to %s'), $cur->current ? $cur->current : __( 'Latest' ) ) . '</a>';

#### 3. 导航条更新功能 (wp-admin/menu.php)

注释第 37 行：

    $submenu[ 'index.php' ][10] = array( sprintf( __('Updates %s'), "<span class='update-plugins count-{$update_data['counts']['total']}' title='{$update_data['title']}'><span class='update-count'>" . number_format_i18n($update_data['counts']['total']) . "</span></span>" ), 'update_core',  'update-core.php');
    
#### 4. 底部更新提示 (wp-admin/admin-footer.php)

注释第 28 行：

    echo $upgrade;

___

ps: 通过手动输入地址 update-core.php，可以查看升级界面
