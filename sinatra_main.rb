require 'sinatra'
require '.\duplicates.rb'

get '/' do
  File.read(File.join('public', 'index.html'))
end

post '/RemoveDuplicates' do
  postText = request.body.read
  puts "post /RemoveDuplicates received: #{postText}"
  retval = "incomplete remove operation"
  begin
    inputArray = JSON.parse(postText)
    begin
      r = RemoveDuplicatesFromArray.new(inputArray, 0)
      r.remove
      retval = r.workingList.to_s
    rescue => e
      retval =  " RemoveDuplicatesFromArray execption on text #{postText}"
      puts retval
      puts "Exception Class: #{ e.class.name }"
      puts "Exception Message: #{ e.message }"
      #puts "Exception Backtrace: #{ e.backtrace }"
    end
  rescue => e
    retval =  "JSON.parse execption on text #{postText}"
    puts retval
    puts "Exception Class: #{ e.class.name }"
    puts "Exception Message: #{ e.message }"
    #puts "Exception Backtrace: #{ e.backtrace }"
  end
  return retval;
end

get '/RemoveDuplicates' do
  puts 'get /RemoveDuplicates received'
  'get /RemoveDuplicates received'
end

puts 'Starting Array Duplicate Removal'
