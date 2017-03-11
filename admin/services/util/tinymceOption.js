/**
 * Created by phuoclam on 11/01/2017.
 */

angular.module('tinymceOptionService', [])
    .factory('Tinymce', function () {
        return {
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste imagetools"
            ],
            insert_button_items: 'image link | inserttable',
            height : "480",
            insert_toolbar: 'quickimage quicktable',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | link image ',
            image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',
            images_upload_base_path: '/public/images',
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');

                input.onchange = function () {
                    var file = this.files[0];

                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    var blobInfo = blobCache.create(id, file);
                    blobCache.add(blobInfo);

                    cb(blobInfo.blobUri(), {title: file.name});
                };

                input.click();
            },
            images_upload_handler: function (blobInfo, success, failure) {
                var xhr, formData;
                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', '/api/dashboard/upload');

                xhr.onload = function() {
                    var json;

                    if (xhr.status != 200) {
                        failure('HTTP Error: ' + xhr.status);
                        return;
                    }

                    json = JSON.parse(xhr.responseText);

                    if (!json || typeof json.location != 'string') {
                        failure('Invalid JSON: ' + xhr.responseText);
                        return;
                    }
                    success(json.location);
                };

                formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
            }
        }
    });
