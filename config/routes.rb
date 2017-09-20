Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api do
    resources :boards, only: [:index, :create]
    resources :lists, only: [:index, :create, :update]
  end

  get '/boards/:id', to: 'home#index'

  get '/ui/all_boards', to: 'ui#all_boards'
  get '/ui/single_board', to: 'ui#single_board'
  get '/ui/create_board', to: 'ui#create_board'
  get '/ui/card', to: 'ui#card'
  get '/ui', to: 'ui#index'
end
