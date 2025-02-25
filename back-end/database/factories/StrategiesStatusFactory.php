<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StrategiesStatus>
 */
class StrategiesStatusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
//            'name' => 'in_progress',
            'name' => $this->faker->unique()->randomElement([
                'pending',
                'in_progress',
                'completed',
                'delayed',
                'dropped'
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function pending()
    {
        return $this->state(fn () => ['name' => 'pending']);
    }

    public function inProgress()
    {
        return $this->state(fn () => ['name' => 'in_progress']);
    }

    public function completed()
    {
        return $this->state(fn () => ['name' => 'completed']);
    }

    public function delayed()
    {
        return $this->state(fn () => ['name' => 'delayed']);
    }

    public function dropped()
    {
        return $this->state(fn () => ['name' => 'dropped']);
    }
}
