/** @jsxImportSource hono/jsx */

import { Layout } from './layout'
import type { Chapter } from '../types/bindings'

export const HomePage = ({ chapters }: { chapters: Chapter[] }) => {
  return (
    <Layout title="ホーム">
      {/* ヒーローセクション */}
      <div class="bg-gradient-to-br from-washi via-kinari to-washi border-b-4 border-matcha">
        <div class="container mx-auto px-4 py-16 max-w-6xl">
          <div class="text-center">
            <h1 class="text-6xl md:text-7xl font-bold font-serif text-sumi mb-6 leading-tight">
              黃亀図書室
            </h1>
            <p class="text-xl md:text-2xl text-matcha-dark font-medium mb-4">
              黄帝内経を学ぶ
            </p>
            <p class="text-base md:text-lg text-sumi opacity-70 max-w-2xl mx-auto leading-relaxed">
              黄帝内経の原文朗読と解説を通じて、東洋医学の古典を深く学ぶための学習プラットフォームです。
            </p>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-16 max-w-6xl">
        <h2 class="text-4xl font-bold mb-12 font-serif text-sumi border-l-4 border-matcha pl-4 inline-block">
          章一覧
        </h2>

        {chapters.length === 0 ? (
          <div class="text-center py-16 bg-washi rounded-lg">
            <p class="text-gray-500 mb-4 text-lg">章が登録されていません</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {chapters.map((chapter, index) => (
              <a
                key={chapter.id}
                href={`/chapters/${chapter.slug}`}
                class="group block relative bg-gradient-to-br from-kinari to-washi border-2 border-matcha-light p-10 rounded-2xl hover:shadow-2xl hover:scale-[1.05] transition-all duration-500 hover:border-matcha overflow-hidden"
              >
                {/* 背景装飾 */}
                <div class="absolute top-0 right-0 w-32 h-32 bg-matcha/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-shu/5 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-700"></div>

                {/* 装飾的なコーナー */}
                <div class="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold rounded-tl-2xl opacity-40 group-hover:opacity-70 transition-opacity"></div>
                <div class="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold rounded-br-2xl opacity-40 group-hover:opacity-70 transition-opacity"></div>

                {/* 番号バッジ */}
                <div class="absolute top-4 right-4 w-12 h-12 rounded-full bg-matcha/10 flex items-center justify-center group-hover:bg-matcha/20 transition-colors">
                  <span class="text-xl font-bold text-matcha">{index + 1}</span>
                </div>

                <div class="relative">
                  <h3 class="text-3xl font-bold mb-5 font-serif text-sumi group-hover:text-shu transition-colors duration-300 leading-tight">
                    {chapter.title}
                  </h3>
                  {chapter.description && (
                    <p class="text-sumi text-base leading-relaxed opacity-80 line-clamp-4 mb-6">
                      {chapter.description}
                    </p>
                  )}

                  {/* 読み進めるボタン */}
                  <div class="mt-8 flex items-center justify-between">
                    <span class="text-sm font-bold text-matcha group-hover:text-shu transition-colors">詳しく見る</span>
                    <svg class="w-6 h-6 text-matcha group-hover:text-shu group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
