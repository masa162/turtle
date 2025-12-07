/** @jsxImportSource hono/jsx */

import { Layout } from './layout'
import type { Chapter, Verse } from '../types/bindings'

export const ChapterDetailPage = ({ 
  chapter, 
  verses 
}: { 
  chapter: Chapter
  verses: Verse[]
}) => {
  return (
    <Layout title={chapter.title}>
      {/* 章ヘッダー */}
      <div class="bg-gradient-to-br from-washi via-kinari to-washi border-b-4 border-matcha">
        <div class="container mx-auto px-4 py-12 max-w-4xl">
          <div class="mb-4">
            <a href="/" class="text-matcha hover:text-shu transition-colors inline-flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              章一覧に戻る
            </a>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold font-serif text-sumi mb-4 leading-tight">
            {chapter.title}
          </h1>
          {chapter.description && (
            <p class="text-lg text-sumi opacity-70 leading-relaxed">
              {chapter.description}
            </p>
          )}
        </div>
      </div>

      {/* 節一覧 */}
      <div class="container mx-auto px-4 py-16 max-w-4xl">
        <h2 class="text-3xl font-bold mb-8 font-serif text-sumi border-l-4 border-matcha pl-4 inline-block">
          節一覧
        </h2>

        {verses.length === 0 ? (
          <div class="text-center py-16 bg-washi rounded-lg">
            <p class="text-gray-500 mb-4 text-lg">節が登録されていません</p>
          </div>
        ) : (
          <div class="space-y-6">
            {verses.map((verse, index) => (
              <a
                key={verse.id}
                href={`/chapters/${chapter.slug}/verses/${verse.id}`}
                class="group block bg-gradient-to-r from-kinari to-washi border-2 border-matcha-light p-6 rounded-xl hover:shadow-xl hover:border-matcha transition-all duration-300"
              >
                <div class="flex items-start gap-6">
                  {/* 番号 */}
                  <div class="flex-shrink-0 w-16 h-16 rounded-full bg-matcha/10 flex items-center justify-center group-hover:bg-matcha/20 transition-colors">
                    <span class="text-2xl font-bold text-matcha">{verse.verse_order}</span>
                  </div>

                  {/* コンテンツ */}
                  <div class="flex-1 min-w-0">
                    <h3 class="text-2xl font-bold mb-2 font-serif text-sumi group-hover:text-shu transition-colors">
                      {verse.title}
                    </h3>
                    
                    {/* 音声アイコン */}
                    {verse.audio_url && (
                      <div class="flex items-center gap-2 text-sm text-matcha-dark">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                        </svg>
                        <span>音声朗読あり</span>
                      </div>
                    )}
                  </div>

                  {/* 矢印 */}
                  <div class="flex-shrink-0">
                    <svg class="w-6 h-6 text-matcha group-hover:text-shu group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
