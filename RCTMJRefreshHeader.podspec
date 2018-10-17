require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name                = 'RCTMJRefreshHeader'
  s.version             = package['version']
  s.summary             = '一个自定义下拉刷新框架'
  s.homepage            = 'https://github.com/react-native-studio/react-native-MJRefresh'
  s.license             = package['license']
  s.author              = package['author']
  s.source              = { :git => 'https://github.com/react-native-studio/react-native-MJRefresh.git', :tag => "v#{package['version']}" }
  s.requires_arc        = true
  s.platform            = :ios, '8.0'
  s.source_files        = 'ios/**/*.{h,m}'
  s.dependency          'React'
end