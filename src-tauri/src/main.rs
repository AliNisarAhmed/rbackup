// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use fs_extra::dir::CopyOptions;

#[tauri::command]
fn do_onetime_backup(inputDir: String, outputDir: String) {
    fs_extra::copy_items(
        &[inputDir],
        outputDir,
        &CopyOptions::new().overwrite(true).copy_inside(true),
    )
    .expect("Failed to copy");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![do_onetime_backup])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
