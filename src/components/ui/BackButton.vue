<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next';
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => router.back()
</script>

<template>
    <div class="flex justify-baseline">
        <button
            type="button"
            @click="goBack"
            class="inline-flex items-center gap-2 text-white hover:text-gray-200"
            aria-label="Back"
        >
            <ChevronLeft class="w-8 h-8" />
            <span class="text-lg font-bold leading-none select-none">Back</span>
        </button>
    </div>
</template>