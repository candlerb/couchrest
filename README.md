# CouchRest: CouchDB, close to the metal

CouchRest is based on [CouchDB's couch.js test
library](http://svn.apache.org/repos/asf/incubator/couchdb/trunk/share/www/script/couch.js),
which I find to be concise, clear, and well designed. CouchRest lightly wraps
CouchDB's HTTP API, managing JSON serialization, and remembering the URI-paths
to CouchDB's API endpoints so you don't have to.

CouchRest is designed to make a simple base for application and framework-specific object oriented APIs. CouchRest is Object-Mapper agnostic, the parsed JSON it returns from CouchDB shows up as subclasses of Ruby's Hash. Naked JSON, just as it was mean to be.

## Easy Install

Easy Install is moving to RubyForge, heads up for the gem.

### Relax, it's RESTful

The core of Couchrest is Heroku’s excellent REST Client Ruby HTTP wrapper.
REST Client takes all the nastyness of Net::HTTP and gives is a pretty face,
while still giving you more control than Open-URI. I recommend it anytime
you’re interfacing with a well-defined web service.

### Running the Specs

The most complete documentation is the spec/ directory. To validate your
CouchRest install, from the project root directory run `rake`, or `autotest`
(requires RSpec and optionally ZenTest for autotest support).

## Examples

Quick Start:

    # with !, it creates the database if it doesn't already exist
    @db = CouchRest.database!("http://127.0.0.1:5984/couchrest-test")
    response = @db.save_doc({:key => 'value', 'another key' => 'another value'})
    doc = @db.get(response['id'])
    puts doc.inspect

Bulk Save:

    @db.bulk_save([
        {"wild" => "and random"},
        {"mild" => "yet local"},
        {"another" => ["set","of","keys"]}
      ])
    # returns ids and revs of the current docs
    puts @db.documents.inspect 

Creating and Querying Views:

    @db.save_doc({
      "_id" => "_design/first", 
      :views => {
        :test => {
          :map => "function(doc){for(var w in doc){ if(!w.match(/^_/))emit(w,doc[w])}}"
          }
        }
      })
    puts @db.view('first/test')['rows'].inspect 

## CouchRest::Model

CouchRest::Model is a module designed along the lines of DataMapper::Resource.
By subclassing, suddenly you get all sorts of powerful sugar, so that working
with CouchDB in your Rails or Merb app is no harder than working with the
standard SQL alternatives. See the CouchRest::Model documentation for an
example article class that illustrates usage.

CouchRest::Model will be removed from this package.