<template>
  <div class="bg-white">
    <div
      class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20"
    >
      <div
        class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40"
      >
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-2xl">
            <div class="max-w-lg">
              <CloudIcon class="text-blue-800 w-20" />

              <h1
                class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                UCC Cloud
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                Sube y descarga tus archivos con UCC Cloud, el servicio de
                almacenamiento en la nube de la Universidad Cooperativa de
                Colombia.
              </p>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                  >Upload file</label
                >
                <input
                  class="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  accept=".txt,.csv,.json"
                  @change="handleFileInput"
                  ref="fileInput"
                />
                <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                  TXT, CSV, JSON.
                </p>
                <div class="flex justify-center pt-5">
                  <button
                    type="button"
                    @click="UploadFile"
                    class="flex items-center justify-center w-full max-w-[200px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <DocumentPlusIcon class="mr-1 h-6 w-6" aria-hidden="true" />
                    Subir archivo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen"
        >
          <div
            class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
            aria-hidden="true"
          />
          <div class="shadow-lg md:rounded-3xl">
            <div class="px-4 sm:px-6 lg:px-8">
              <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                  <h1 class="text-base font-semibold leading-6 text-gray-900">
                    Archivos subidos
                  </h1>
                  <p class="mt-2 text-sm text-gray-700">
                    Lista de archivos subidos por los usuarios.
                  </p>
                </div>
              </div>
              <div class="mt-8 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div
                    class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                  >
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Nombre del archivo
                          </th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Peso
                          </th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Extension
                          </th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Fecha de subida
                          </th>
                          <th
                            scope="col"
                            class="relative py-3.5 pl-3 pr-4 sm:pr-0"
                          >
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="archive in Archives" :key="archive.key">
                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-komercia sm:pl-0"
                          >
                            {{ archive.Key }}
                          </td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            {{
                              (Math.floor(archive.Size) / 1024).toFixed(2) +
                              " KB"
                            }}
                          </td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            {{ archive.Key.split(".").pop().toUpperCase() }}
                          </td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            {{
                              archive.LastModified.split("-")
                                .slice(0, 2)
                                .join("-")
                            }}
                          </td>
                          <td
                            class="relative whitespace-nowrap space-x-3 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                          >
                            <button
                              @click="DownloadFile(archive.Key)"
                              class="bg-gray-200 hover:bg-blue-600 rounded-full p-0.5 text-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              <ArrowDownTrayIcon class="w-5" /><span
                                class="sr-only"
                                >, {{ archive.Key }}</span
                              >
                            </button>
                            <button
                              @click="modalView(archive.Key)"
                              class="bg-gray-200 hover:bg-red-600 rounded-full p-0.5 text-red-600 hover:text-white"
                            >
                              <TrashIcon class="w-5" /><span class="sr-only"
                                >, {{ archive.Key }}</span
                              >
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"
      />
    </div>
  </div>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <ExclamationTriangleIcon
                    class="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                    >Eliminar archivo</DialogTitle
                  >
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Estas seguro que desea eliminar el archivo?
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  @click="DeleteFile()"
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="open = false"
                >
                  Cancelar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  CloudIcon,
  DocumentPlusIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const store = useStore();
const fileInput = ref(null);
const open = ref(false);
const selectedFileKey = ref('');


const modalView = (key) => {
  open.value = true;
  selectedFileKey.value = key;
};

const handleFileInput = (event) => {
  fileInput.value = event.target.files[0];
};

const UploadFile = async () => {
  const file = fileInput.value;
  const formData = new FormData();
  formData.append("file", file);
  try {
    await store.dispatch("UPLOAD_ARCHIVE", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await getArchives();
  } catch (error) {
    console.error(error);
  } finally {
    fileInput.value = null;
  }
};

const DownloadFile = async (key) => {
  
  
  try {
    await store.dispatch("DOWNLOAD_ARCHIVE", key);
    const downloadUrl = `${store.state.url_api}/api/files/${key}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
  }
};

const DeleteFile = async () => {
  open.value = false;
  const key = selectedFileKey.value;
  try {
    await store.dispatch("DELETE_ARCHIVE", key);
    await getArchives();
  } catch (error) {
    console.error(error);
  }
};

const Archives = computed(() => store.state.archives);

const getArchives = () => store.dispatch("GET_ALL_ARCHIVES");

onMounted(async () => {
  await getArchives();
});
</script>
