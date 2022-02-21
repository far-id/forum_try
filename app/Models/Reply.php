<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reply extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = [
        'children',
        'user'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }
}
