<?php

namespace App\Http\Resources;

use Illuminate\Support\Str;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'body' => $this->body,
            'teaser' => Str::limit($this->body, 159, '...'),
            'created_at' => $this->created_at->format('d F, Y'),
            'answer_id' => $this->answer_id,
            'category' => [
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ],
            'likes_count' => $this->likes_count,
            'replies_count' => $this->replies_count,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
                // 'picture' => $this->when(request()->routeIs('threads.show'), $this->user->picture()),
                'picture' => $this->user->picture(),
            ],
        ];
    }
}
